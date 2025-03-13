/*
  # Add event details fields with defaults

  1. Changes
    - Add new columns to events table with default values:
      - `date` (date, defaults to current date)
      - `time` (time, defaults to current time)
      - `venue` (text, defaults to 'TBD')
    - Use defaults to handle existing rows
*/

ALTER TABLE events 
ADD COLUMN date date NOT NULL DEFAULT CURRENT_DATE,
ADD COLUMN time time NOT NULL DEFAULT CURRENT_TIME,
ADD COLUMN venue text NOT NULL DEFAULT 'TBD';

-- After adding columns with defaults, we can remove the defaults
ALTER TABLE events 
ALTER COLUMN date DROP DEFAULT,
ALTER COLUMN time DROP DEFAULT,
ALTER COLUMN venue DROP DEFAULT;