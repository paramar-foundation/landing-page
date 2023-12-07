/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { api } from "~/src/trpc/react";
import Image from "next/image";

import styles from "./admin.module.scss";

export const AdminPanel = () => {
  const { data: ambassadors } = api.ambassador.getAll.useQuery();
  // const { data: projects } = api.projects.getAll.useQuery();
  return (
    <article className={styles.admin}>
      <div>
        <h3>Ambassadors</h3>
        <table>
          <tr>
            <th>#</th>
            <th>Ambassador</th>
            <th>Actions</th>
          </tr>
          {ambassadors?.map((ambassador) => (
            <tr key={ambassador.id}>
              <td>{ambassador.id}</td>
              <td>
                <span>
                  <Image
                    src={ambassador.picture}
                    alt="picture"
                    width={45}
                    height={60}
                  />
                  {ambassador.name}
                </span>
              </td>
              <td>edit</td>
            </tr>
          ))}
        </table>
      </div>
    </article>
  );
};
