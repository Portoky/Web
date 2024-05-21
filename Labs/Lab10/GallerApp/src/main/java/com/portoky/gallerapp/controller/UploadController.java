package com.portoky.gallerapp.controller;

import com.portoky.gallerapp.asset.DbManager;
import com.portoky.gallerapp.domain.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Paths;

@MultipartConfig(fileSizeThreshold = 1024 * 1024,
        maxFileSize = 1024 * 1024 * 5,
        maxRequestSize = 1024 * 1024 * 5 * 5)
@WebServlet(name = "upload", value = "/upload")
public class UploadController extends HttpServlet {
    final String UPLOAD_DIRECTORY = "D:\\xampp\\tomcat\\webapps\\GallerApp\\src\\main\\webapp\\uploads";
    public static final String DEFAULT_FILENAME = "default.file";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute("user");
        DbManager dbManager = new DbManager();

        File uploadDir = new File(UPLOAD_DIRECTORY);
        if (!uploadDir.exists()) uploadDir.mkdir();
        try {
            String fileName = "";
            for (Part part : request.getParts()) {
                fileName = part.getSubmittedFileName(); //getting the filename from the header
                System.out.println(fileName);
                part.write(uploadDir + File.separator + fileName);
                dbManager.uploadImageToDb(user.getUserId(), fileName); //upload db with the filename
            }
        }catch (FileNotFoundException fne) {
            request.setAttribute("message", "There was an error: " + fne.getMessage());
        }
        //update db




        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }
    //another method
    private String getFileName(Part part) {
        for (String content : part.getHeader("content-disposition").split(";")) {
            if (content.trim().startsWith("filename"))
                return content.substring(content.indexOf("=") + 2, content.length() - 1);
        }
        return DEFAULT_FILENAME;
    }
}
