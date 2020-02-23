***Settings***
Documentation  Test register 
Resource  ../Resources/Common.robot
Resource  ../Resources/TimetableApp.robot
Test Setup  Begin Web Test
Test Teardown  End Web Test

***Test Cases***
App should be able to show nearby stops
  TimetableApp.Go to main page
  TimetableApp.Show a nearby stop  Kauppakorkeakoulut
  TimetableApp.Show a nearby stop  Fredrikinkatu

