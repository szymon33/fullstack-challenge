class ComicVote < ApplicationRecord
  def self.upvote(comic_id:)
    find_or_initialize_by(comic_id: comic_id).tap { |c| c.votes += 1 }.save
  end
end
