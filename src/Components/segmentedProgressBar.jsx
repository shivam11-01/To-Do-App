import React, { useEffect, useState } from "react";
import "./progressbar.css";

const SegmentedProgressBar = ({ tasks }) => {
  const [totalTasks, setTotalTasks] = useState(0);
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    // Calculate total tasks and percentages for each task type
    const _totalTasks =
      tasks.todo.length +
      tasks.inProgress.length +
      tasks.inReview.length +
      tasks.completed.length;

    const _progressData = {
      todo: {
        percentage: Math.round((tasks.todo.length / _totalTasks) * 100),
        count: tasks.todo.length,
      },
      inProgress: {
        percentage: Math.round((tasks.inProgress.length / _totalTasks) * 100),
        count: tasks.inProgress.length,
      },
      inReview: {
        percentage: Math.round((tasks.inReview.length / _totalTasks) * 100),
        count: tasks.inReview.length,
      },
      completed: {
        percentage: Math.round((tasks.completed.length / _totalTasks) * 100),
        count: tasks.completed.length,
      },
    };

    setTotalTasks(_totalTasks);
    setProgressData(_progressData);

    // Save tasks to local storage whenever they change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const getSegmentStyle = (index, length) => {
    const baseStyle =
      "text-xs font-medium text-center p-0.5 leading-none relative";
    if (index === 0) {
      return `${baseStyle}`;
    } else if (index === length - 1) {
      return `${baseStyle}`;
    } else {
      return baseStyle;
    }
  };

  return (
    <>
      {progressData.todo?.percentage > 0 ||
      progressData.inProgress?.percentage > 0 ||
      progressData.inReview?.percentage > 0 ||
      progressData.completed?.percentage > 0 ? (
        <>
          <div className="w-full fixed top-0 bg-gray-200 rounded-full dark:bg-gray-700 flex h-4">
            {progressData.todo.percentage > 0 && (
              <div
                className={`bg-[#7f27ff] text-white ${getSegmentStyle(0, 4)}`}
                style={{ width: `${progressData.todo.percentage}%` }}
                title={`Todo: ${progressData.todo.count} tasks`}
              >
                {progressData.todo.percentage}%
                <div className="tooltip">
                  {`Todo: ${progressData.todo.count} tasks`}
                </div>
              </div>
            )}
            {progressData.inProgress.percentage > 0 && (
              <div
                className={`bg-[#fe7a36] text-white ${getSegmentStyle(1, 4)}`}
                style={{ width: `${progressData.inProgress.percentage}%` }}
                title={`In Progress: ${progressData.inProgress.count} tasks`}
              >
                {progressData.inProgress.percentage}%
                <div className="tooltip">
                  {`In Progress: ${progressData.inProgress.count} tasks`}
                </div>
              </div>
            )}
            {progressData.inReview.percentage > 0 && (
              <div
                className={`bg-[#1679AB] text-white ${getSegmentStyle(2, 4)}`}
                style={{ width: `${progressData.inReview.percentage}%` }}
                title={`In Review: ${progressData.inReview.count} tasks`}
              >
                {progressData.inReview.percentage}%
                <div className="tooltip">
                  {`In Review: ${progressData.inReview.count} tasks`}
                </div>
              </div>
            )}
            {progressData.completed.percentage > 0 && (
              <div
                className={`bg-[#17ab4b] text-white ${getSegmentStyle(3, 4)}`}
                style={{ width: `${progressData.completed.percentage}%` }}
                title={`Completed: ${progressData.completed.count} tasks`}
              >
                {progressData.completed.percentage}%
                <div className="tooltip">
                  {`Completed: ${progressData.completed.count} tasks`}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SegmentedProgressBar;
