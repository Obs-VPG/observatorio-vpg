'use client';
import { PointField, useField } from '@payloadcms/ui';
import type { PointFieldClientComponent } from 'payload';
import MapWithAutocomplete from './MapWithAutocomplete';

export const LocationField: PointFieldClientComponent = (props) => {
  const { field, path } = props;
  const { value, setValue } = useField({ path });

  // @ts-ignore
  const handleChange = (place) => {
    setValue([place.lng, place.lat]);
  };
  return (
    <div className="mb-8">
      <p className="text-[#302e2a] mt-2 mb-2 font-semibold tracking-[0.025rem] text-[13px] uppercase">
        Localização <span className="text-red-600">*</span>
      </p>
      <MapWithAutocomplete
        // @ts-ignore
        lat={value ? value[1] : 0}
        // @ts-ignore
        lng={value ? value[0] : 0}
        handleChange={handleChange}
      />
      <div className="mt-5">
        <PointField {...props} />
      </div>
    </div>
  );
};
