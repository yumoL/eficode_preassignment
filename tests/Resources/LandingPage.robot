*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${START_URL} =  http://localhost:3000

*** Keywords ***
Load
  Go To  ${START_URL}

Verify Page Loaded
  Wait Until Page Contains  Timetable of Public Transportation from Eficode Headquarter