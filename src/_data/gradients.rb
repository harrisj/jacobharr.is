require 'pathname'
require 'date'

puts 'Generating gradient includes...'

# Define the directory path
gradients_dir = Pathname.new(site.root_dir).join('src', 'images', 'projects', 'sky-gradients')

# Get the list of files in the directory
filenames = Dir.entries(gradients_dir).select { |file| File.file?(File.join(gradients_dir, file)) && file.end_with?('.jpg') }

file_records = filenames.map do |filename|
    parts = filename.gsub('.jpg', '').split('-')
    date = Date.iso8601(parts[0])
    season = parts[1].capitalize
    location = parts[2].gsub('+', ' ')

    {
        filename: filename,
        date: date,
        season: season,
        location: location,
        year: date.year
    }
end

file_records
