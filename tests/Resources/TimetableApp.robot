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
  
Choose time range from dropdown
  [Arguments]  ${TIME_RANGE}
  Page Should Contain Element  ${TIME_RANGE_DROPDOWN}
  Click Element  ${TIME_RANGE_DROPDOWN}
  Click Element  ${TIME_RANGE}

Show a nearby stop
  [Arguments]  ${STOP}
  Page Should Contain  ${STOP}

Should contain routes whose departure time is more than an hour
  Wait Until Element Contains  ${TIME_TABLE}  :


Should only contain routes whose departure time is within an hour
  Wait Until Element Does Not Contain  ${TIME_TABLE}  :