require 'sinatra'
require 'data_mapper'

DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/myapp.db")
 
class Note
    include DataMapper::Resource
    property :id, Serial
    property :title, String, :required => true
    property :content, Text, :required => true
    property :created_at, DateTime
    property :updated_at, DateTime
end
 
DataMapper.finalize.auto_upgrade!

get '/' do
    @notes = Note.all :order => :id.desc
    erb :home
end

post '/' do
    note = Note.new
    note.title = params[:note_title]
    note.content = params[:note_content]
    note.created_at = Time.now
    note.updated_at = Time.now
    note.save
    redirect '/'
end

delete '/delete/:id' do
    note = Note.get params[:id]
    note.destroy
    redirect '/'
end

put '/edit/:id' do
    note = Note.get params[:id]
    note.title = params[:note_title]
    note.content = params[:note_content]
    note.updated_at = Time.now
    note.save
    redirect '/'
end

    
    
        
