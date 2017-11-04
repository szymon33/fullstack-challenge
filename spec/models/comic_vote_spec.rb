require 'rails_helper'

describe ComicVote do
  context '#upvote' do
    let(:action) { described_class.upvote(comic_id: 123) }

    it 'creates new ComicVote' do
      expect { action }
        .to change {
              described_class.all.count
            }.by(1)
    end

    it 'sets votes counter to 1' do
      action
      upvote = described_class.find_by(comic_id: 123)
      expect(upvote.votes).to eq 1
    end

    it 'increases existing votes counter' do
      comic_vote = described_class.create!(comic_id: 123, votes: 5)
      expect { action }
        .to change {
              comic_vote.reload.votes
            }.from(5).to(6)
    end
  end
end
