
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolios Table
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio Assets Table
CREATE TABLE portfolio_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  quantity NUMERIC NOT NULL,
  purchase_price NUMERIC NOT NULL,
  purchase_date DATE DEFAULT CURRENT_DATE,
  asset_type TEXT CHECK (asset_type IN ('stock', 'crypto', 'etf', 'bond'))
);

-- Marketplace Opportunities Table
CREATE TABLE marketplace_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  funding_goal NUMERIC,
  current_funding NUMERIC DEFAULT 0,
  min_investment NUMERIC,
  start_date DATE,
  end_date DATE
);

-- Marketplace Investments Table
CREATE TABLE marketplace_investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  opportunity_id UUID REFERENCES marketplace_opportunities(id),
  amount NUMERIC NOT NULL,
  investment_date DATE DEFAULT CURRENT_DATE
);

-- Simulated Trades Table
CREATE TABLE simulated_trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  symbol TEXT NOT NULL,
  trade_type TEXT CHECK (trade_type IN ('buy', 'sell')),
  quantity NUMERIC NOT NULL,
  price_at_trade NUMERIC NOT NULL,
  trade_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Portfolios Table
CREATE TABLE ai_portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  risk_profile TEXT CHECK (risk_profile IN ('low', 'medium', 'high'))
);

-- AI Portfolio Assets Table
CREATE TABLE ai_portfolio_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ai_portfolio_id UUID REFERENCES ai_portfolios(id),
  symbol TEXT NOT NULL,
  allocation_percent NUMERIC CHECK (allocation_percent >= 0 AND allocation_percent <= 100)
);

-- Leaderboard Table
CREATE TABLE leaderboard (
  user_id UUID REFERENCES users(id) PRIMARY KEY,
  simulated_portfolio_value NUMERIC,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
