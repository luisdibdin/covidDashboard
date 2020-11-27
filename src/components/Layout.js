import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import "assets/stylesheets/application.scss";
import { ChakraProvider, Flex, Heading } from "@chakra-ui/react";

import Header from "components/Header";
import Footer from "components/Footer";

const Layout = ({ children, pageName }) => {
  let className = "";

  if (pageName) {
    className = `${className} page-${pageName}`;
  }

  return (
    <ChakraProvider>
      <Helmet bodyAttributes={{ class: className }}>
        <title>COVID Dashboard</title>
      </Helmet>
      <div className="wrapper">
        <Flex h='80px' w='100%' bg='gray.800' justify='center' align='center'>
          <Heading>COVID-19 Dashboard</Heading>
        </Flex>
        <main>{children}</main>
      </div>
    </ChakraProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageName: PropTypes.string,
};

export default Layout;
