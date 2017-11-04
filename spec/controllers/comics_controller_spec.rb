require 'rails_helper'

RSpec.describe Api::ComicsController, type: :controller do

  describe 'GET /comics' do

    before do
      VCR.use_cassette('comics') do
        get 'index', format: :json
      end
    end

    specify { expect(response).to match_response_schema("comics") }
    specify { expect(response.status).to eq 200 }

    describe 'JSON' do
      let(:subject) { JSON.parse(response.body).first }

      it { is_expected.to include 'id' => a_kind_of(Integer) }
      it { is_expected.to include 'title' => a_kind_of(String) }
      it { is_expected.to include 'issueNumber' => a_kind_of(Integer) }
      it { is_expected.to include 'variantDescription' => a_kind_of(String) }
      it { is_expected.to include 'isbn' => a_kind_of(String) }
      it { is_expected.to include 'characters' => a_kind_of(Hash) }
      it { is_expected.to include 'images' => a_kind_of(Array) }
      it { is_expected.to include 'creators' => a_kind_of(Hash) }
      it { is_expected.to include 'dates' => a_kind_of(Array) }
      it { is_expected.to include 'thumbnail' => a_kind_of(Hash) }
    end
  end

  describe 'PUT /comics/:comic_id/upvote' do

    before { put :upvote, params: { comic_id: 123 } }

    specify { expect(response.status).to eq 200 }
    specify { expect(response).to match_response_schema('upvote') }
  end

  describe 'GET /comics/upvotes' do

    before do
      ComicVote.create(comic_id: 123, votes: 1)
      ComicVote.create(comic_id: 435, votes: 1)
      ComicVote.create(comic_id: 456, votes: 1)

      get 'upvotes', format: :json
    end

    specify { expect(response.status).to eq 200 }
    specify { expect(response).to match_response_schema("upvotes") }
  end
end
