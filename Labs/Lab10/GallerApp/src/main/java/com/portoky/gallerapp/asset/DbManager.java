package com.portoky.gallerapp.asset;

import com.portoky.gallerapp.domain.Picture;
import com.portoky.gallerapp.domain.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DbManager {
    private Connection con;
    private PreparedStatement stmt;

    private String imageFolderPath = "D:\\xampp\\tomcat\\webapps\\GallerApp\\target\\GallerApp-1.0-SNAPSHOT\\images";

    public DbManager(){
        connect();
    }

    public void connect(){
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            String connectionString = "jdbc:sqlserver://localhost:1433;databaseName=GalleryApp;user=Portoky;password=jelszo;encrypt=true;trustServerCertificate=true;";
            this.con = DriverManager.getConnection(connectionString);
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println("Error connecting to DB");
            e.printStackTrace();
        }

    }
    public User Authenticate(String username, String password){
        ResultSet rs = null;
        User user = null;
        try{
            String sql = "SELECT * FROM [dbo].users WHERE username = ? AND password = ?";
            stmt =  con.prepareStatement(sql);
            stmt.setString(1, username);
            stmt.setString(2, password);
            rs = stmt.executeQuery();

            if (rs.next()) {
                user = new User(rs.getInt("USerId"), rs.getString("Username"), rs.getString("Password"));
            }
        }catch (SQLException e){
            e.printStackTrace();
        }finally{
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return user;
    }

    public List<Picture> getAllPicturesSortedByVotes(){
        ResultSet rs = null;
        List<Picture> pictures = new ArrayList<>();
        try{
            String sql = "SELECT p.pictureId, p.Filename, p.UserId, SUM(v.Vote) as TotalVotes " +
                    "FROM pictures p " +
                    "Left Join votes v ON p.pictureId = v.pictureId " +
                    "Group By p.pictureId, p.Filename, p.UserId " +
                    "Order by TotalVotes DESC";
            stmt =  con.prepareStatement(sql);
            rs = stmt.executeQuery();

            while (rs.next()) {
                // Create Picture object from each row in the result set
                Picture picture = new Picture(rs.getInt("PictureId"),rs.getInt("UserId") ,rs.getString("Filename"), rs.getInt("TotalVotes"));
                pictures.add(picture);
            }
        }catch (SQLException e){
            e.printStackTrace();
        }finally{
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return pictures;
    }

    public void  uploadImageToDb(Integer userId, String filename){
        try{
            String sql = "INSERT INTO pictures (UserId, Filename) VALUES (?, ?)";
            stmt =  con.prepareStatement(sql);
            stmt.setInt(1, userId);
            stmt.setString(2, filename);
            stmt.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            try {
                if(stmt!=null) stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }


    public boolean hasVote(Integer userId, Integer pictureId) {
           try{
               String sql = "SELECT COUNT(*) FROM votes WHERE userId = ? AND pictureId = ?";
               stmt = con.prepareStatement(sql);
               stmt.setInt(1,userId);
               stmt.setInt(2, pictureId);
               ResultSet rs = stmt.executeQuery();
               if(rs.next() && rs.getInt(1) > 0){
                   return true;
               }
               return false;
           }catch (SQLException e){
               e.printStackTrace();
           }finally {
               try {
                   if(stmt!=null) stmt.close();
               } catch (SQLException e) {
                   e.printStackTrace();
               }
           }
        return false;
    }

    public void addVote(Integer userId, Integer pictureId, Integer vote) {
        try{
            String sql = "INSERT INTO votes (UserId, PictureId, Vote) VALUES (?, ?, ?)";
            stmt = con.prepareStatement(sql);
            stmt.setInt(1, userId);
            stmt.setInt(2, pictureId);
            stmt.setInt(3, vote);
            stmt.executeUpdate();
        }catch(SQLException e){
            e.printStackTrace();
        }finally {
            try {
                if(stmt!=null) stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
