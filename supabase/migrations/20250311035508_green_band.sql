/*
  # Add sample events data

  1. Sample Data
    - Adds three sample events:
      - Web Development Workshop
      - Data Science Bootcamp
      - UI/UX Design Masterclass
    
  2. Changes
    - Adds sample event records to the events table
    - Uses safe INSERT with conflict handling
*/

DO $$ 
BEGIN
  -- Insert sample events if they don't exist
  INSERT INTO events (title, description, image_url, form_link, whatsapp_link)
  SELECT
    'Web Development Workshop',
    'Join our intensive 2-day workshop on modern web development. Learn React, Node.js, and build real-world projects. Perfect for beginners and intermediate developers looking to level up their skills.',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800',
    'https://forms.google.com/web-dev-workshop',
    'https://chat.whatsapp.com/web-dev-group'
  WHERE NOT EXISTS (
    SELECT 1 FROM events WHERE title = 'Web Development Workshop'
  );

  INSERT INTO events (title, description, image_url, form_link, whatsapp_link)
  SELECT
    'Data Science Bootcamp',
    'Dive into the world of data science with our comprehensive bootcamp. Cover Python, pandas, machine learning, and data visualization. Real-world projects and hands-on experience included.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800',
    'https://forms.google.com/data-science-bootcamp',
    'https://chat.whatsapp.com/data-science-group'
  WHERE NOT EXISTS (
    SELECT 1 FROM events WHERE title = 'Data Science Bootcamp'
  );

  INSERT INTO events (title, description, image_url, form_link, whatsapp_link)
  SELECT
    'UI/UX Design Masterclass',
    'Master the art of user interface and experience design. Learn design principles, prototyping, user research, and modern design tools. Create a portfolio-ready project by the end of the course.',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800',
    'https://forms.google.com/design-masterclass',
    'https://chat.whatsapp.com/design-group'
  WHERE NOT EXISTS (
    SELECT 1 FROM events WHERE title = 'UI/UX Design Masterclass'
  );
END $$;