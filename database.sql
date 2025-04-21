create table crewmates (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  speed float8 not null,
  color text not null
);

-- Set up Row Level Security (RLS)
alter table crewmates enable row level security;

-- Create a policy that allows all operations
create policy "Allow public access" on crewmates
  for all
  using (true)
  with check (true); 