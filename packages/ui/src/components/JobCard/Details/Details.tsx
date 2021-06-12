import React from 'react';
import { useDetailsTabs } from '../../../hooks/useDetailsTabs';
import { Button } from '../Button/Button';
import s from './Details.module.css';
import { DetailsContent } from './DetailsContent/DetailsContent';
import { AppJob, Status } from '@bull-board/api/typings/app';
import { STATUSES } from '@bull-board/api/dist/src/constants/statuses';

interface DetailsProps {
  job: AppJob;
  status: Status;
  actions: { getJobLogs: () => Promise<string[]> };
}

export const Details = ({ status, job, actions }: DetailsProps) => {
  const { tabs, selectedTab } = useDetailsTabs(
    job.isFailed ? STATUSES.failed : status,
    job.stacktrace.length > 0
  );

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={s.details}>
      <ul className={s.tabActions}>
        {tabs.map((tab) => (
          <li key={tab.title}>
            <Button onClick={tab.selectTab} isActive={tab.isActive}>
              {tab.title}
            </Button>
          </li>
        ))}
      </ul>
      <div className={s.tabContent}>
        <div>
          <DetailsContent selectedTab={selectedTab} job={job} actions={actions} />
        </div>
      </div>
    </div>
  );
};
