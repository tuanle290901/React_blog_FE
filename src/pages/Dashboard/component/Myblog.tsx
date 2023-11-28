// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { useTranslation } from 'react-i18next';

interface AccountData {
  id: string;
  // Add other properties if needed
}

const Myblog: React.FC = () => {
  const { t } = useTranslation();
  const accountDataString = localStorage.getItem("account");
  const accountData: AccountData | null = accountDataString ? JSON.parse(accountDataString) : null;
  let accountId = '';

  if (accountData) {
    accountId = accountData.id || '';
  }

  console.log(accountId);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {/* Render your content based on accountId */}
      {accountId && (
        <div>
          {/* Display accountId or other content */}
          {t('Account ID')}: {accountId}
        </div>
      )}
    </div>
  );
};

export default Myblog;
