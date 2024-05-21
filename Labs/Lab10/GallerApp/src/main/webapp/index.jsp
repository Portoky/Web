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
            height: 300px;
        }
        .picture{
            height: 200px;
            width:  200px;
            display: inline-block;
            border-width: 20px;
            padding: 5px;
            text-align:center;
        }
    </style>
</head>
<body>
    <h1>Gallery</h1>
    <%
        if(request.getAttribute("ownPictureVotedErrMess") != null){
            %>  <p style='color:red'>You cannot vote for your own image!</p> <%
        }
        if(request.getAttribute("alreadyVotedErrMess")!= null){
            %>  <p style='color:red'>You have already voted for this image!</p> <%
        }

        int displayCount = 5; // Default number of images to display
        String countParam = request.getParameter("count");
        if (countParam != null) {
            try {
                displayCount = Integer.parseInt(countParam);
            } catch (NumberFormatException e) {
                // Handle the error if needed, fall back to default value
            }
        }
    %>
    <form method="get" action="">
        <label for="count">Number of images to display:</label>
        <select id="count" name="count" onchange="this.form.submit()">
            <option value="100000"<%= (displayCount == 100000) ? "selected" : "" %>>All</option>
            <option value="5" <%= (displayCount == 5) ? "selected" : "" %>>5</option>
            <option value="10" <%= (displayCount == 10) ? "selected" : "" %>>10</option>
            <option value="15" <%= (displayCount == 15) ? "selected" : "" %>>15</option>
            <option value="20" <%= (displayCount == 20) ? "selected" : "" %>>20</option>
        </select>
    </form>
    <div id="pictureRowContainer">
        <%
            DbManager dbManager = new DbManager();
            List<Picture> pictures = dbManager.getAllPicturesSortedByVotes();
            String contextPath = request.getContextPath();
            /*String imageDirectoryPath = (String) request.getAttribute("imageDirectoryPath");
            if(imageDirectoryPath == null){
                imageDirectoryPath = "uploads";
            }*/
            int stopIndex = Math.min(displayCount, pictures.size()); //stop for whole
            int endIndex = 5; //end for a row
            int startIndex = 0;
            while(endIndex < stopIndex){
                List<Picture> rowPictures = pictures.subList(startIndex, endIndex);

                %><div class='pictureRow'><%
                for(Picture rowPicture : rowPictures){
                    %>
                        <div class="picture">
                            <img src= "uploads/<%= rowPicture.getFilename() %>" alt="<%=rowPicture.getFilename()%>" width="200">
                            <div>
                                <form action="vote" method="post">
                                    <p>Votes: <%= rowPicture.getTotalVotes() %></p>
                                    <input type="number" name="<%= rowPicture.getPictureId() %>" min="1" max="5">
                                    <button type="submit">Vote</button>
                                </form>
                            </div>
                        </div>
                    <%
                }
                startIndex = endIndex;
                endIndex = endIndex + 5;
                %></div><%

            }

            if(startIndex != stopIndex){
                List<Picture> rowPictures = pictures.subList(startIndex, stopIndex);
                %>
        <div class='pictureRow'><%
                for(Picture rowPicture : rowPictures){
                    %>
                        <div class="picture">
                            <img src= "uploads/<%= rowPicture.getFilename() %>" alt="<%=rowPicture.getFilename()%>" width="200">
                            <div>
                                <form action="vote" method="post">
                                    <p>Votes: <%= rowPicture.getTotalVotes() %></p>
                                    <input type="number" name="<%= rowPicture.getPictureId() %>" min="1" max="5">
                                    <button type="submit">Vote</button>
                                </form>
                            </div>

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
