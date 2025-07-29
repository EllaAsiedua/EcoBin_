-- Add leaderboard scoring columns to users table if they don't exist
DO $$ 
BEGIN
    -- Add total_score column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'total_score') THEN
        ALTER TABLE users ADD COLUMN total_score INTEGER DEFAULT 0;
    END IF;
    
    -- Add dumps_reported column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'dumps_reported') THEN
        ALTER TABLE users ADD COLUMN dumps_reported INTEGER DEFAULT 0;
    END IF;
    
    -- Add spots_adopted column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'spots_adopted') THEN
        ALTER TABLE users ADD COLUMN spots_adopted INTEGER DEFAULT 0;
    END IF;
    
    -- Add marketplace_sales column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'marketplace_sales') THEN
        ALTER TABLE users ADD COLUMN marketplace_sales INTEGER DEFAULT 0;
    END IF;
    
    -- Add cleanup_sessions column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'cleanup_sessions') THEN
        ALTER TABLE users ADD COLUMN cleanup_sessions INTEGER DEFAULT 0;
    END IF;
    
    -- Add cycle_tokens_earned column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'cycle_tokens_earned') THEN
        ALTER TABLE users ADD COLUMN cycle_tokens_earned INTEGER DEFAULT 0;
    END IF;
END $$; 