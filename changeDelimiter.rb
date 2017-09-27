require 'csv'

rootdir = File.expand_path("../", __FILE__)
csv_to_be_converted = rootdir + "/input/csv/cards.csv"
cards_csv_target = rootdir + "/input/cardsNewDelim.csv"

cards_arr = CSV.read(csv_to_be_converted)

CSV.open(cards_csv_target, "wb", col_sep: "$$$$") do |csv|
  cards_arr[1..cards_arr.length-1].each { |row| csv << row }
end
