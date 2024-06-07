const fetch = require('node-fetch');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type ImageData implements Node {
      localFile: File @link(from: "fields.localFile")
    }

    type BannerData implements Node {
      localFile: File @link(from: "fields.localFile")
    }

    type ImageDataAboutUs implements Node @childOf(types: ["AboutUsData"]) {
      localFile: File @link(from: "fields.localFile")
    }
  `;
  createTypes(typeDefs);
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  try {
    const res_gallery = await fetch(`${process.env.GATSBY_API_URL}images-data`);
    const res_books = await fetch(`${process.env.GATSBY_API_URL}books`);
    const res_homepage = await fetch(`${process.env.GATSBY_API_URL}homepage-data`)
    const res_new_books = await fetch(`${process.env.GATSBY_API_URL}books-new-list`)
    const imagesData = await res_gallery.json();
    const booksData = await res_books.json();
    const homepageData = await res_homepage.json();
    const { banner: bannerData, aboutUs: aboutUsData } = homepageData;
    const newBooksData = await res_new_books.json();

    imagesData.forEach(image => {
      const nodeMeta = {
        id: createNodeId(`image-data-${image.id}`),
        parent: null,
        children: [],
        internal: {
          type: 'ImageData',
          contentDigest: createContentDigest(image),
        },
      };

      createNode({ ...image, ...nodeMeta });
      console.log(`Created node for image with ID: ${image.id}`);
    });

    booksData.forEach(book => {
      const nodeMeta = {
        id: createNodeId(`book-${book.id}`),
        parent: null,
        children: [],
        internal: {
          type: 'Book',
          contentDigest: createContentDigest(book),
        },
      };

      createNode({ ...book, ...nodeMeta });
      }
    );


    newBooksData.forEach(book => {
      const nodeMeta = {
        id: createNodeId(`new-book-${book.id}`),
        parent: null,
        children: [],
        internal: {
          type: 'NewBook',
          contentDigest: createContentDigest(book),
        },
      };

      createNode({ ...book, ...nodeMeta });
      }
    );


    const nodeBannerMeta = {
      id: createNodeId(`banner-data`),
      parent: null,
      children: [],
      internal: {
        type: 'BannerData',
        contentDigest: createContentDigest(bannerData),
      },
    };

    createNode({ ...bannerData, ...nodeBannerMeta });
 
    console.log('aboutUsData.image1', aboutUsData.image1)

    const id1 = createNodeId(`image-data-about-us-1`);
    const id2 = createNodeId(`image-data-about-us-2`);
    const aboutUsId = createNodeId(`about-us-data`);
    createNode({
      ...aboutUsData.image1,
      id: id1,
      parent: aboutUsId,
      children: [],
      internal: {
        type: 'ImageDataAboutUs',
        contentDigest: createContentDigest(aboutUsData.image1),
      },
    });

    createNode({
      ...aboutUsData.image2,
      id: id2,
      parent: aboutUsId,
      children: [],
      internal: {
        type: 'ImageDataAboutUs',
        contentDigest: createContentDigest(aboutUsData.image2),
      },
    });
    
    const nodeAboutUsMeta = {
      id: aboutUsId,
      parent: null,
      children: [id1, id2],
      internal: {
        type: 'AboutUsData',
        contentDigest: createContentDigest(aboutUsData),
      },
    };

    createNode({ ...aboutUsData, ...nodeAboutUsMeta });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

exports.onCreateNode = async ({ node, actions, store, cache, createNodeId }) => {
  const { createNode, createNodeField } = actions;

  if (node.internal.type === 'ImageData') {
    try {
      const fileNode = await createRemoteFileNode({
        url: `${process.env.GATSBY_API_URL}${node.file_name}`,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        store,
      });

      if (fileNode) {
        createNodeField({
          node,
          name: 'localFile',
          value: fileNode.id,
        });
        console.log(`Created remote file node for image with ID: ${node.id} and linked to localFile`);
      } else {
        console.log(`Failed to create remote file node for image with ID: ${node.id}`);
      }
    } catch (error) {
      console.error(`Error creating remote file node for image with ID: ${node.id}`, error);
    }
  }

  if (node.internal.type === 'BannerData') {
    const fileNode = await createRemoteFileNode({
      url: `${process.env.GATSBY_API_URL}${node.image.file_name}`,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    });
    if (fileNode) {
      createNodeField({
        node,
        name: 'localFile',
        value: fileNode.id,
      });
      console.log(`Created remote file node for banner with ID: ${node.id} and linked to localFile`);
    } else {
      console.log(`Failed to create remote file node for banner with ID: ${node.id}`);
    }
  }

  if (node.internal.type === 'ImageDataAboutUs') {
    console.log('ImageDataAboutUs node')
    const fileNode = await createRemoteFileNode({
      url: `${process.env.GATSBY_API_URL}${node.file_name}`,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    });
    console.log(fileNode);
    createNodeField({
        node,
        name: 'localFile',
        value: fileNode.id,
    });
      
  }
};
