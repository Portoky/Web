package com.portoky.gallerapp.domain;

public class Picture {
    private Integer pictureId;
    private Integer userId;
    private String filename;
    private Integer totalVotes;

    public Picture(Integer pictureId, Integer userId, String filename) {
        this.pictureId = pictureId;
        this.userId = userId;
        this.filename = filename;
        this.totalVotes = 0;
    }

    public Picture(Integer pictureId, Integer userId, String filename, Integer totalVotes) {
        this.pictureId = pictureId;
        this.userId = userId;
        this.filename = filename;
        this.totalVotes = totalVotes;
    }

    public Integer getPictureId() {
        return pictureId;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getFilename() {
        return filename;
    }

    public Integer getTotalVotes() {
        return totalVotes;
    }

    public void setTotalVotes(Integer totalVotes) {
        this.totalVotes = totalVotes;
    }
}
