import { When, Then } from 'cypress-cucumber-preprocessor/steps'

/* global cy */

let aboutMeText
let myLocation

const matchNameInUserMenu = name => {
  cy.get('.avatar-menu').click() // open
  cy.get('.avatar-menu-popover').contains(name)
  cy.get('.avatar-menu').click() // close again
}

When('I save {string} as my new name', name => {
  cy.get('input[id=name]')
    .clear()
    .type(name)
  cy.get('[type=submit]')
    .click()
    .not('[disabled]')
})

When('I save {string} as my location', location => {
  cy.get('input[id=city]').type(location)
  cy.get('.ds-select-option')
    .contains(location)
    .click()
  cy.get('[type=submit]')
    .click()
    .not('[disabled]')
  myLocation = location
})

When('I have the following self-description:', text => {
  cy.get('textarea[id=bio]')
    .clear()
    .type(text)
  cy.get('[type=submit]')
    .click()
    .not('[disabled]')
  aboutMeText = text
})

When('people visit my profile page', url => {
  cy.openPage('/profile/peter-pan')
})

When('they can see the text in the info box below my avatar', () => {
  cy.contains(aboutMeText)
})

Then('they can see the location in the info box below my avatar', () => {
  cy.contains(myLocation)
})

Then('the name {string} is still there', name => {
  matchNameInUserMenu(name)
})

Then(
  'I can see my new name {string} when I click on my profile picture in the top right',
  name => matchNameInUserMenu(name)
)
