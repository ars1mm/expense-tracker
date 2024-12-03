-- Drop existing foreign key if it exists
DO $$ 
BEGIN 
    IF EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_expenses_user'
    ) THEN
        ALTER TABLE expenses DROP CONSTRAINT fk_expenses_user;
    END IF;
END $$;

-- Check if user_id column exists and add it if it doesn't
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'expenses' 
        AND column_name = 'user_id'
    ) THEN
        ALTER TABLE expenses ADD COLUMN user_id TEXT NOT NULL;
    ELSE
        -- If column exists but is UUID, alter it to TEXT
        ALTER TABLE expenses ALTER COLUMN user_id TYPE TEXT;
    END IF;
END $$;

-- Create index if it doesn't exist
DROP INDEX IF EXISTS idx_expenses_user_id;
CREATE INDEX idx_expenses_user_id ON expenses(user_id);

-- Enable RLS if not already enabled
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can only view their own expenses" ON expenses;
DROP POLICY IF EXISTS "Users can only insert their own expenses" ON expenses;
DROP POLICY IF EXISTS "Users can only update their own expenses" ON expenses;
DROP POLICY IF EXISTS "Users can only delete their own expenses" ON expenses;

-- Create policies using the TEXT user_id
CREATE POLICY "Users can only view their own expenses"
ON expenses FOR SELECT
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can only insert their own expenses"
ON expenses FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can only update their own expenses"
ON expenses FOR UPDATE
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can only delete their own expenses"
ON expenses FOR DELETE
USING (auth.uid()::text = user_id);
