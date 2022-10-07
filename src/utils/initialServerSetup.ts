import { AppDataSource } from "../data-source";
import { Post } from "../models/Post";
import { User } from "../models/User";

export const initialize = async () => {
  const materials: any = [
    {
      name: "Germain",
      image: "https://static.zman.co.il/www/uploads/2021/08/F210315YS70.jpg",
      eximg:
        "https://marvel-b1-cdn.bc0a.com/f00000000026007/resilienteducator.com/wp-content/uploads/2014/11/math-teacher.jpg",
    },
    {
      name: "Bamba Supa Kid",
      image:
        "https://www.srugim.co.il/i/wp-content/uploads/2022/02/%D7%94%D7%AA%D7%99%D7%A0%D7%95%D7%A7-%D7%A9%D7%9C-%D7%91%D7%9E%D7%91%D7%94__w650h331q80.jpg",
      eximg:
        "https://cdn.shopify.com/s/files/1/0274/5634/0081/products/BambaNugat60_475x475.png?v=1596706654",
    },
    {
      name: "Skooby",
      image:
        "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2021-06/210615-scooby-doo-al-1315-25fdf5.jpg",
      eximg:
        "https://i.pinimg.com/736x/ee/3c/16/ee3c16658a352467a8e727d300fe314f.jpg",
    },
    {
      name: "Yaniv",
      image:
        "https://res.cloudinary.com/atzuma/image/upload/c_thumb,g_face:center,h_630,q_80,w_1200/v1568112072/atzuma/tlt8veicdduiwu5mmdty.jpg",
      eximg:
        "https://i.cbc.ca/1.5227440.1564183592!/fileImage/httpImage/image.JPG_gen/derivatives/16x9_780/transgender-waxing-hrt-jessica-yaniv.JPG",
    },
    {
      name: "Jouchan",
      image:
        "https://i.pinimg.com/474x/23/b0/1c/23b01c1e3037bd2e5edf222232869b7c.jpg",
      eximg: "https://media.tenor.com/vebF_E3Vj8EAAAAM/anime-dance.gif",
    },
  ];

  const users: User[] = [];

  materials.forEach(async (material) => {
    const user = await AppDataSource.getRepository(User).save(
      new User(material.name, material.image, [])
    );

    await AppDataSource.getRepository(Post).save(
      new Post(user.avatarSrc, new Date(), user, [])
    );

    users.push(user);
  });

  users.forEach(async (user) => {
    await AppDataSource.getRepository(Post).save(
      new Post(
        materials.find((material) => material.user === user.name).eximg,
        new Date(),
        user,
        []
      )
    );
  });
};
