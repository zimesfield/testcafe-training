import { $ } from "../utils/selector-factory"
import { muiMenuItemSelect, muiMenuItemSelectMultiple } from "../utils/helper";

class OrganisationListPageModel {
  pageFirst = $("[data-test=pager-first]");
  pageLast = $("[data-test=pager-last]");
  pageRight = $("[data-test=pager-next]");
  pageLeft = $("[data-test=pager-prev]");
  pagePageNumber = $("[data-test=current-page]");
  orgRow = $("[data-test=org-row]");
  pageSizeFilter = $("[data-test=page-size-filter]");
  pageSizeMenuItem25 = $("[data-test=menu-item-page-size]");
  // pageSizeMenuItem50 = $("[name=status]");
  pageSizeMenuItem50 = $("(//input[@name='status'])[2]");

  menuItem = $("[role=menuitem]");
  orderFilter = $("[data-test=org-list-order-filter]");
  orgSearchFilter= $("[data-test=org-list-search]").find("input");


  async clickNextPage(t: TestController) {
    await t.click(this.pageRight);
  }
  async clickPreviousPage(t: TestController) {
    await t.click(this.pageLeft);
  }
  async clickFirstPage(t: TestController) {
    await t.click(this.pageFirst);
  }
  async clickLastPage(t: TestController) {
    await t.click(this.pageLast);
  }
  async search(t: TestController, text: string) {
    await t.typeText(this.orgSearchFilter, text);
  }
  async selectPageSize(t: TestController, size: string) {
    await t.click(this.pageSizeFilter);
    await muiMenuItemSelect(t, this.pageSizeMenuItem25, size);
  }

  async filter(t: TestController, filterDataTest: string, value?: string) {
    await t.click($(`[data-test=${filterDataTest}]`));
    await muiMenuItemSelect(
      t,
      $(`[data-test=menu-${filterDataTest}]`).find("li"),
      value
    );
    await t.pressKey("esc");
  }

  async filterMultiple(t: TestController, filterDataTest: string, values?: Array<string>) {
    await t.click($(`[data-test=${filterDataTest}]`));
    await muiMenuItemSelectMultiple(
      t,
      $(`[data-test=menu-${filterDataTest}]`).find("li"),
      values
    );
    await t.pressKey("esc");
  }
}

export default new OrganisationListPageModel();