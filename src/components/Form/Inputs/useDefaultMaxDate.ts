import { useMemo } from 'react';

// Same as @blueprintjs/datetime 3.24.0's default maxDate, so it does not depend on the installed version.
export const useDefaultMaxDate = () =>
  useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 6);
    return date;
  }, []);
