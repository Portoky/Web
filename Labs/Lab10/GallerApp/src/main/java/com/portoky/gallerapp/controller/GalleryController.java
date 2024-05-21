package com.portoky.gallerapp.controller;

import com.portoky.gallerapp.domain.User;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;

@WebServlet(name = "gallery", value = "/")
public class GalleryController extends HttpServlet {
    final String UPLOAD_DIRECTORY = "D:\\xampp\\tomcat\\webapps\\GallerApp\\src\\main\\webapp\\uploads";
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        User user = (User)session.getAttribute("user");
        String imageDirectoryPath = UPLOAD_DIRECTORY;
        request.setAttribute("imageDirectoryPath", imageDirectoryPath);
        if(user == null) {
            response.sendRedirect(request.getContextPath() + "/login");

        }else{
            RequestDispatcher rd = request.getRequestDispatcher("/index.jsp");
            rd.forward(request, response);
        }
    }

}
