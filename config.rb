activate :deploy do |deploy|
  deploy.build_before = true # default: false
  deploy.method = :git
  deploy.remote = "origin"
  deploy.branch = "master"
end

Time.zone = "America/Denver"

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"
  blog.sources = "/posts/:year-:month-:day-:title.html"
  blog.permalink = ":title.html"
  blog.name = "elliotec"
  # Matcher for blog source files
  # blog.sources = "{year}-{month}-{day}-{title}.html"
  blog.taglink = "tags/{tag}.html"
  # blog.layout = "layout"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  # blog.default_extension = ".markdown"

  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end

page "/feed.xml", layout: false

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :build_dir, 'build'

set :markdown_engine, :redcarpet

set :markdown, :fenced_code_blocks => true, :smartypants => true, :tables => true

configure :build do
end

activate :livereload
activate :directory_indexes
activate :syntax