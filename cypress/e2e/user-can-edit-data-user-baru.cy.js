describe('User Can Edit Existing Data User Baru', () => {
  afterEach(() => {
    cy.exec(
      'cd ../xampp/htdocs/demo-app-cypress-automation && php artisan migrate:fresh --seed');
  });
  //before each test case
  beforeEach(() => {
    //reset database by calling php artisan
    cy.exec(
      'cd ../xampp/htdocs/demo-app-cypress-automation && php artisan migrate:fresh --seed');
    //arrange
    cy.visit('http://127.0.0.1:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('password');
    cy.get('.btn').click();
    cy.visit('http://127.0.0.1:8000/user-management/user');
  })

  //positif test case
  it.only('User can edit existing data', () => {
    cy.get('.table td')
      .contains('User Baru')
      .parent()
      .find('a')
      .contains('Edit')
      .click();
    cy.get('#name').clear('User Baru');
    cy.get('#name').type('User Baru edited');
    cy.get('.btn-primary').contains('Submit').click();
    cy.get('.table td')
      .contains('User Baru').should('have.text', 'User Baru edited');
    cy.get('.alert').should('be.visible').and('contain', 'User Berhasil Diupdate')
  })

  it('negative test case', () => {
    
  })
});
