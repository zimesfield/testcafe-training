 Feature: organisation List

     Scenario Outline: I can change the order that items are displayed on the Organisation Dashboard
         Given I am on the organisations page
         When I click the order by button
         When I click "<selector>" selector
         Examples:
             | selector    |
             |  Acronym    |

     Scenario Outline: I can search using search tool for specific Organisations
         Given I am on the organisations page
         When I search by "<searchValue>"
         Then The organisations list contains "<searchResult>"
         Examples:
             |  searchValue   |searchResult      |
             | Assoc          | Assoc            |
             | Association Of | Association Of   |


     @skip
     Scenario: I can filter Items displayed on the Organisation Dashboard
         Given I am on the organisations page
         When I filter by show only pending approvals by checking the showOnlyPendingApprovals checkbox
         And I click the applyButton
         Then the items displayed are only Organisations that have pending approvals
         When I click the clearButton
         Then the items displayed are all Organisations and filter is removed
