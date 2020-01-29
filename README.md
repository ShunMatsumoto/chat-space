# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## Chat-space
プログラミングスクールTECH::EXPERTのカリキュラム内で作成したチャットアプリです。
<img width="1440" alt="スクリーンショット 2020-01-29 12 41 47" src="https://user-images.githubusercontent.com/58409647/73326602-1bf83380-4296-11ea-9c36-a7aa29f52a37.png">


## リンク
http://3.114.54.129/

## アプリ説明
ユーザー登録後、グループを作成しチャットで会話をすることができます。
グループにはユーザーを複数登録、編集でき、インクリメンタルサーチでユーザー検索が可能です。
チャット機能は非同期通信で行っています。

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|mail|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|string|-------|
|photo|image|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belong_to :user
- belong_to :group