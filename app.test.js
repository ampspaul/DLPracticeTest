'use strict';

// Minimal test suite for heading rename and core app functions

describe('Heading constants', function () {
    it('HEADING_TEXT should reference Tennessee Student', function () {
        expect(typeof HEADING_TEXT).toBe('string');
        expect(HEADING_TEXT).toContain('Tennessee Student');
    });

    it('SECTION_HEADING should reference TN Student', function () {
        expect(typeof SECTION_HEADING).toBe('string');
        expect(SECTION_HEADING).toContain('TN Student');
    });
});

describe('setHeading', function () {
    beforeEach(function () {
        document.body.innerHTML = '<h1 id="main-heading"></h1>';
    });

    it('should set the main heading text', function () {
        setHeading();
        const el = document.getElementById('main-heading');
        expect(el.textContent).toBe(HEADING_TEXT);
    });

    it('should not throw if main-heading element is missing', function () {
        document.body.innerHTML = '';
        expect(function () { setHeading(); }).not.toThrow();
    });
});

describe('renderQuestions', function () {
    it('should render the correct number of question elements', function () {
        const container = document.createElement('div');
        const mockQuestions = [
            { text: 'What is the speed limit in a school zone?' },
            { text: 'When must you use your headlights?' }
        ];
        renderQuestions(mockQuestions, container);
        expect(container.querySelectorAll('.question').length).toBe(2);
    });

    it('should number questions starting from 1', function () {
        const container = document.createElement('div');
        const mockQuestions = [{ text: 'Sample question?' }];
        renderQuestions(mockQuestions, container);
        const first = container.querySelector('.question');
        expect(first.textContent).toMatch(/^1\./);
    });

    it('should clear previous content before rendering', function () {
        const container = document.createElement('div');
        container.innerHTML = '<div class="question">old</div>';
        renderQuestions([], container);
        expect(container.querySelectorAll('.question').length).toBe(0);
    });
});