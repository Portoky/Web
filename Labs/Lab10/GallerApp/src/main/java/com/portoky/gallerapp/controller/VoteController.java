package com.portoky.gallerapp.controller;

import com.portoky.gallerapp.asset.DbManager;
import com.portoky.gallerapp.domain.User;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Enumeration;

@WebServlet(name = "vote", value = "/vote")
public class VoteController extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        if(user == null) {
            RequestDispatcher rd = request.getRequestDispatcher("/login.jsp");
            rd.forward(request, response);
        }

        DbManager dbManager = new DbManager();

        Enumeration<String> picturesIds = request.getParameterNames();
        while(picturesIds.hasMoreElements()){
            String stringPictureId = (String)picturesIds.nextElement();
            Integer pictureId = Integer.valueOf(stringPictureId); //getting the pictureId
            //getting the vote
            Integer vote =  Integer.valueOf(request.getParameter(stringPictureId));
            if(dbManager.hasVote(user.getUserId(), pictureId)){ //if you voted you cannot once again!!!!
                request.setAttribute("errorVotingMess", "You have already voted for this picture.");
                RequestDispatcher rd = request.getRequestDispatcher("/index.jsp");
                rd.forward(request, response);
                return;
            }else {
                dbManager.addVote(user.getUserId(), pictureId, vote);
            }
            response.sendRedirect(request.getContextPath() + "/");
        }


    }
}