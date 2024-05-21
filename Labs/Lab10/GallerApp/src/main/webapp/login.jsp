<%@ page import="java.io.PrintWriter" %><%--
  Created by IntelliJ IDEA.
  User: User
  Date: 5/19/2024
  Time: 1:04 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Login</title>
</head>
<body>
<h2>Login</h2>
<form action="login" method="post">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required><br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required><br>
    <button type="submit">Login</button>
    <%
        if (request.getParameter("error") != null) {
            out.println("<p style='color:red'>Invalid username or password!</p>");
        }
    %>
</form>
</body>
</html>
