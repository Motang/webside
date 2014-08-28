webside
====

A simple web site with SpringMVC + Mybatis + Shiro + Druid + Ehcache frameworks, it is a J2EE project named 'webside', provide HTTP and Hessian interface to clients.

## Preparation

1. Above JDK1.6 install
2. Above Maven 3.0.5, Private repository with Nexus is more better in Company
3. Eclipse Java EE IDE with Git, 'Kepler' version is more better
4. MySQL install (No mandatory requirement, maybe replace with H2 or HSQLDB)

## User Guide

1. generate a Eclipse project with the following MAVEN script in CMD or SHELL window

  mvn eclipse:eclipse
  
2. run project in Tomcat

  mvn tomcat:run -Dmaven.test.skip=true
  
3. enter the following URL in browser with username/password(zhang/123) to login

  http://localhost:8080/webside/index

## For Test
1. Unit Test, enter the following command

  mvn test

2. Integration Test, enter the following command

  mvn integration-test

## Introduction
  Here introduces some very important configuration files to integrate SpringMVC、MyBatis、Shiro、Ehcache(such as web.xml, Spring configuration, SpringMVC configuration)

### Guide to web.xml
src/main/webapp/WEB-INF/web.xml contains:
  Spring context configuration,
  Shiro configuration,
  Charset encode filter,
  Durid configuration,
  Hessian configuration,
  SpringMVC configuration

### Guide to Spring configuration files: 
  spring-config.xml,
  spring-dao.xml,
  spring-common.xml,
  spring-shiro.xml

### Guide to Spring MVC configuration file: 
  spring-mvc.xml