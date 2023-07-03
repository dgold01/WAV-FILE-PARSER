
describe('File Drag and Drop Test', () => {
  it('Displays file information when dragged onto the element', () => {
    cy.visit('http://localhost:3000/');
    cy.fixture('mockData.wav').then((fileContent) => {
      const file = new File([fileContent], 'mockData.wav', { type: 'audio/wav' });
      cy.get('.dropzone')
        .should(($dropzone) => {
          expect($dropzone).to.contain('DRAG FILE');
        })
        .trigger('dragenter', { dataTransfer: { files: [file] } })
        .should(($dropzone) => {
          expect($dropzone).to.contain('DROP HERE');
        })
        .should('have.class', 'dropzoneDROPHERE')
        .trigger('dragover', { dataTransfer: { files: [file] } })
        .should(($dropzone) => {
          expect($dropzone).to.contain('DROP HERE');
        })
        .should('have.class', 'dropzoneDROPHERE')
        .trigger('dragleave')
        .should(($dropzone) => {
          expect($dropzone).to.contain('DRAG FILE');
        })
        .should('have.class', 'dropzoneDRAGFILE')
        .trigger('drop', { dataTransfer: { files: [file] } })
        .should(($dropzone) => {
          expect($dropzone).to.contain('FILE DROPPED');
        })
        .should('have.class', 'dropzoneDRAGFILE')
      cy.contains('.resultsTable', 'SAMPLE RATE').should('contain', '22050');
      cy.contains('.resultsTable', 'NUM CHANNLES').should('contain', '2');
      cy.contains('.resultsTable', 'CHUNK ID').should('contain', 'RIFF');
      cy.contains('.resultsTable', 'CHUNK SIZE').should('contain', '2084');
      cy.contains('.resultsTable', 'AUDIO FORMAT').should('contain', '1');
      cy.contains('.resultsTable', 'FORMAT').should('contain', 'WAVE');
      cy.contains('.resultsTable', 'SUB CHUNK ID').should('contain', 'FMT');
      cy.contains('.resultsTable', 'BYTE RATE').should('contain', 'BYTE 1488830447');
      cy.contains('.resultsTable', 'BLOCK ALIGN').should('contain', '1');
      cy.contains('.resultsTable', 'BITS PER SAMPLE').should('contain', '4');
    });
  });
  it('Displays correct error message if not WAV file', () => {
    cy.visit('http://localhost:3000/');
    cy.fixture('chimes-7035.mp3').then((fileContent) => {
      const file = new File([fileContent], 'chimes-7035.mp3', { type: 'audio/mp3' });
      cy.get('.dropzone')
        .trigger('drop', { dataTransfer: { files: [file] } })
        .wait(1500)
        .should(($dropzone) => {
          expect($dropzone).to.contain('Sorry, the selected file is not in WAV format. Please choose a valid WAV file.');
        })
    });
  })
  it('Displays correct error message if FileReader encounters an error', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.dropzone')
      .trigger('drop', {
        dataTransfer: {
          files: [],
          items: [{ kind: 'file', type: 'folder' }],
          types: ['Files'],
        },
      })
      .wait(1500)
      .should(($dropzone) => {
        expect($dropzone).to.contain('Sorry, the selected file is not in WAV format. Please choose a valid WAV file.');
      })
  })
});
