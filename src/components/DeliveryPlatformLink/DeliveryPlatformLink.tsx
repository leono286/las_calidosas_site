import { Entry } from "contentful";
import { TypeDeliveryPlatformFields } from "@/Types";
import Image from 'next/image';

function DeliveryPlatformLink({
  fields: { name, url, logo },
}: Entry<TypeDeliveryPlatformFields>) {

  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Image
        src={`https:${logo.fields.file.url}`}
        width={80}
        height={80}
        alt={name}
      />
    </a>
  );
}

export default DeliveryPlatformLink;
