Use GalleryApp
GO

CREATE TABLE users (
    UserId INT Identity(1,1) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    [Password] VARCHAR(50) NOT NULL
);

CREATE TABLE pictures (
    PictureId INT Identity(1,1) PRIMARY KEY,
    UserId INT,
    [Filename] VARCHAR(255),
    FOREIGN KEY (UserId) REFERENCES users(UserId)
);

CREATE TABLE votes (
    VoteId INT Identity(1,1) PRIMARY KEY,
    PictureId INT,
    UserId INT,
    Vote INT,
    FOREIGN KEY (PictureId) REFERENCES pictures(PictureId),
    FOREIGN KEY (UserId) REFERENCES users(UserId)
);
select * from [dbo].users;
insert into users (UserName, [Password]) Values ('portoky2', 'jelszo');

SELECT name FROM sys.databases WHERE name = 'GalleryApp';

SELECT p.pictureId, p.Filename,  SUM(v.Vote) as TotalVotes 
                    FROM pictures p 
                    Left Join votes v ON p.pictureId = v.PictureId 
                    Group By p.pictureId, p.Filename
                    Order by TotalVotes DESC

ALTER TABLE pictures DROP COLUMN Image;
select * from pictures where ;
delete from pictures;
