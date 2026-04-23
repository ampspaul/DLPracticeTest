'use strict';

/**
 * Student heading module for DL Practice Test
 */

const studentHeading = {
  /**
   * Initialize the student heading display
   * @param {string} studentName - The student's name
   * @param {string} containerId - The container element ID
   */
  init: function (studentName, containerId) {
    if (!studentName || typeof studentName !== 'string') {
      console.error('Invalid student name provided');
      return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
      console.error('Container element not found: ' + containerId);
      return;
    }

    this.render(container, studentName.trim());
  },

  /**
   * Render the student heading into the given container
   * @param {HTMLElement} container
   * @param {string} studentName
   */
  render: function (container, studentName) {
    const heading = document.createElement('h2');
    heading.className = 'student-name-heading';
    heading.textContent = this.formatName(studentName);
    container.appendChild(heading);
  },

  /**
   * Format student name for display
   * @param {string} name
   * @returns {string}
   */
  formatName: function (name) {
    if (!name) return '';
    return name
      .split(' ')
      .map(function (word) {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  },

  /**
   * Clear the student heading from a container
   * @param {string} containerId
   */
  clear: function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const heading = container.querySelector('.student-name-heading');
    if (heading) {
      container.removeChild(heading);
    }
  }
};

// Export for Node/testing environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = studentHeading;
}