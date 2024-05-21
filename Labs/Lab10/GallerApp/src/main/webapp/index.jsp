<%@ page import="com.portoky.gallerapp.asset.DbManager" %>
<%@ page import="com.portoky.gallerapp.domain.Picture" %>
<%@ page import="java.util.List" %>
<%@ page import="java.io.File" %><%--
  Created by IntelliJ IDEA.
  User: User
  Date: 5/20/2024
  Time: 2:59 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Gallery</title>
    <style>
        .pictureRow {
            display: flex;
        }
        .picture{
            display: inline-block;
            border-width: 20px;
            padding: 5px;
            text-align:center;
        }
    </style>
</head>
<body>
    <h1>Gallery</h1>
    <div id="pictureRowContainer">
        <%
            DbManager dbManager = new DbManager();
            List<Picture> pictures = dbManager.getAllPicturesSortedByVotes();
            String contextPath = request.getContextPath();
            /*String imageDirectoryPath = (String) request.getAttribute("imageDirectoryPath");
            if(imageDirectoryPath == null){
                imageDirectoryPath = "uploads";
            }*/
            int endIndex = 5;
            int startIndex = 0;
            while(endIndex < pictures.size()){
                List<Picture> rowPictures = pictures.subList(startIndex, endIndex);

                %><div class='pictureRow'><%
                for(Picture rowPicture : rowPictures){
                    %>
                        <div class="picture">
                            <img src="src/main/webapp/uploads/<%= rowPicture.getFilename() %>" alt="picture">
                            <input style="margin:auto" type="number" name="vote_<%= rowPicture.getPictureId() %>" min="1" max="5">
                        </div>
                    <%
                }
                startIndex = endIndex;
                endIndex = endIndex + 5;
            }
            if(startIndex != pictures.size()){
                List<Picture> rowPictures = pictures.subList(startIndex, pictures.size());
                for(Picture rowPicture : rowPictures){
                    %>
                        <div class="picture">
                            <img src= "uploads/<%= rowPicture.getFilename() %>" alt="<%=rowPicture.getFilename()%>" width="200">
                            <br/>
                            <form action="vote" method="post">
                                <p>Votes: <%= rowPicture.getTotalVotes() %></p>
                                <input type="number" name="<%= rowPicture.getPictureId() %>" min="1" max="5">
                                <button type="submit">Vote</button>
                            </form>
                            <br/>

                        </div>
                    <%
                }
            }
            %></div><%
         %>
        <!--for upload-->
        <div class="uploadContainer">
        <form action="upload" method="post" enctype="multipart/form-data">
            <label for="img">Select image:</label>
            <input type="file" id="img" name="img" accept="image/*">
            <input type="submit" value="Upload">
        </form>
        </div>
    </div>
</body>
</html>
