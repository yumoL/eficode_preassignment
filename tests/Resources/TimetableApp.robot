***Settings***
Library  SeleniumLibrary
Resource  ./LandingPage.robot

***Variables***
${TIME_RANGE_DROPDOWN} =  id=timeRange
${TIME_TABLE} =  id=timeTable

***Keywords***
Go to main page
  LandingPage.Load
  LandingPage.Verify Page Loaded

Show a nearby stop
  [Arguments]  ${STOP}
  Page Should Contain  ${STOP}
