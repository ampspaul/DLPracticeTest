import React from 'react';
import PropTypes from 'prop-types';

const StudentHeading = ({ studentName, testTitle, score }) => {
  const displayName = studentName || 'Student';
  const displayTitle = testTitle || 'Practice Test';

  return (
    <div className="student-heading" role="banner" aria-label="Student Heading">
      <h1 className="student-heading__title">{displayTitle}</h1>
      <h2 className="student-heading__name" aria-label={`Student: ${displayName}`}>
        {displayName}
      </h2>
      {score !== undefined && score !== null && (
        <p className="student-heading__score" aria-label={`Score: ${score}`}>
          Score: {score}
        </p>
      )}
    </div>
  );
};

StudentHeading.propTypes = {
  studentName: PropTypes.string,
  testTitle: PropTypes.string,
  score: PropTypes.number,
};

StudentHeading.defaultProps = {
  studentName: 'Student',
  testTitle: 'Practice Test',
  score: null,
};

export default StudentHeading;