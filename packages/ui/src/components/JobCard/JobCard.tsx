import React from 'react';
import { Details } from './Details/Details';
import { JobActions } from './JobActions/JobActions';
import s from './JobCard.module.css';
import { Progress } from './Progress/Progress';
import { Timeline } from './Timeline/Timeline';
import { AppJob, Status } from '@bull-board/api/typings/app';
import { STATUSES } from '@bull-board/api/dist/src/constants/statuses';

interface JobCardProps {
  job: AppJob;
  status: Status;
  readOnlyMode: boolean;
  actions: {
    promoteJob: () => Promise<void>;
    retryJob: () => Promise<void>;
    cleanJob: () => Promise<void>;
    getJobLogs: () => Promise<string[]>;
  };
}

export const JobCard = ({ job, status, actions, readOnlyMode }: JobCardProps) => (
  <div className={s.card}>
    <div className={s.sideInfo}>
      <span title={`#${job.id}`}>#{job.id}</span>
      <Timeline job={job} status={status} />
    </div>
    <div className={s.contentWrapper}>
      <div className={s.title}>
        <h4>
          {job.name}
          {job.attempts > 0 && <span>attempt #{job.attempts + 1}</span>}
        </h4>
        {!readOnlyMode && (
          <JobActions status={job.isFailed ? STATUSES.failed : status} actions={actions} />
        )}
      </div>
      <div className={s.content}>
        <Details status={status} job={job} actions={actions} />
        {typeof job.progress === 'number' && (
          <Progress
            percentage={job.progress}
            status={job.isFailed ? STATUSES.failed : status}
            className={s.progress}
          />
        )}
      </div>
    </div>
  </div>
);
