***Settings***
Documentation  Test register 
Resource  ../Resources/Common.robot
Resource  ../Resources/TimetableApp.robot
# Suite Setup  Insertg testing data
Test Setup  Begin Web Test
Test Teardown  End Web Test
# Suite Teardown  Cleanup testing data

***Variables***
${TIME_RANGE_1} =  xpath=//*[@id="timeRange"]/div[2]/div[1]
${TIME_RANGE_8} =  xpath=//*[@id="timeRange"]/div[2]/div[8]

***Test Cases***
App should be able to show nearby stops
  TimetableApp.Go to main page
  TimetableApp.Show a nearby stop  Kauppakorkeakoulut
  TimetableApp.Show a nearby stop  Fredrikinkatu

User should be able to choose time range within which transportation will leave
  TimetableApp.Go to main page
  TimetableApp.Choose time range from dropdown  ${TIME_RANGE_8}
  TimetableApp.Should contain routes whose departure time is more than an hour

  TimetableApp.Choose time range from dropdown  ${TIME_RANGE_1}
  TimetableApp.Should only contain routes whose departure time is within an hour


