module ComicRepresenter
  include Roar::JSON

  property :id
  property :title
  property :issueNumber
  property :variantDescription
  property :isbn
  property :characters
  property :images
  property :creators
  property :dates
  property :thumbnail
end
