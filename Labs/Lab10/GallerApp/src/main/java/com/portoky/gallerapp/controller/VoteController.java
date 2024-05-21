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
            String stringVote = request.getParameter(stringPictureId);
            if(stringVote.equals("")){
                response.sendRedirect(request.getContextPath() + "/");
            }
            Integer vote =  Integer.valueOf(stringVote);
            //validation
            if(dbManager.hasVote(user.getUserId(), pictureId)){ //if you voted you cannot once again!!!!
                request.setAttribute("alreadyVotedErrMess", "You have already voted for this picture.");

            }
            if(dbManager.getPicturesUserId(pictureId).equals(user.getUserId())){ //cannot vote for you own picture
                request.setAttribute("ownPictureVotedErrMess", "You cannot vote for your own picture.");
            }
            else {
                dbManager.addVote(user.getUserId(), pictureId, vote);
            }
        }
        response.sendRedirect(request.getContextPath() + "/");
    }
}
