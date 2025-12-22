"use client";

import { getBannerSrc } from "@/lib/bannerMap";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Banner() {
  const pathname = usePathname();
  const src = getBannerSrc(pathname);

  return (
    <div className="relative w-full h-80 overflow-hidden">
      <Image
        key={src}
        src={src}
        alt="Banner"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL={
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEQ0lEQVR4AaSV21IbWQxFG///NyYxeLgTB8LUvPnMWlvn9AWbIlWhdN3SltRtu9j9+/baPuo72Pvbr/YbfXs9ttdfP9vx+NJefj61p+eH9vB43+7ub9vh9tBuDtdtf7NvP/bfu35r+/23dn39vR0OP9rd7XV7vL9pz4//tOPLXXs7PrT310d2PrX/fj+33fSXfy38tQ3wR0bW2QGCH9nnWJs22JwQlNQIYht1AUYwPOCukcwKUFILGgXKBa0mFaZVq5wIgxTQbSatwM1McN4A1uEqCycUmUwzwwRFgBi3agegDyyNK0OPi1YIfQqFASZs09kbCE6TY2upRAAlxVTYre+1NJIPTzXtye2hJiY/Wrkhb8DWrhC8XLVfqm9EFQtN1qwEcqATYcOIAe45FcR55ZxCqRLfAADdWdBBUnaKZ5ZctOcUiSqPdRhE8aHgMsfMeLHUqz8YOR8B4wgC0ERmR0UDjxdmkRUcEEeyhgAhhglOAIgAIgYQy41cn1YquxHEY1LEIK5inoOrQEQOi2IOxgvMeBguA4FCBIJd90kX7dj2DQDW4IVUvQ5UC7cni+d+a1vd1uW5efRU7hwOWBKBrVqTNLzxorWk17h04XaMt7Bg8gZurE7TziGlFlUL6jo2/xNdc9bxmrvFeQNL0UM4Grdgmyc4LfiJ16/O9bm2XUDb5/Mobr+E+ZhYMjwNY8nwLlzH5m1eDhdOsI33KLXXT8bT5JzNG5DIR5mLMUgn9GESTi4bCi4m77JOmxnQ5rx4+Q74uKXMmxsqXg2A3dppVee4YHia20blqZ/VOg5/8xFAYUE/hlexHdpJZ0eMo2Bvjhj94io5C32DeXpi5/MrqIVuhp/EwlDuoASZ4vJZj6Udt/aFsm+ZQ69HqPwzyvfePSz3UpSIng1hHJQjmNZOnx0BHzKnwe+xeXTkerXxz8hlaIQmYISjiBGGMMqFJOMIL49+wGmpfobNcUYxA6D4jl9y3oDdpfRSJUYqXhqL/HXOBcwYfYbG+ik/O+d4fPnxK2DhEBdz7OQgqDo+HiJASZfV9tEzYrxMBlIxQqezI3gDV2P3lI6esa9yA4fgv17OqvRBjYfIUMJ6EAKkx9XDAX3jcOFoqoGREMgV2JePsMiAOBj0kTEAESMvHnkOqh7gaVfPXzak2cA0xhVZEgNkoWJchoijDlbpD80eglTASHuvM4byK6Bn+riefjqoEDiAuSFjlOgaqxgK/RazTDoBQqRYxAM4Mwp0/hHQo1BjLjaCATx/apaK0+li1U6HG1OKyGMvUCp4eDSaXT6AYpjDkDvEVBJ0QxwZkxFPiFahbHAM9NTiyccFhpcPkG83fiwmhAeoRFkuGAXICpIe6shWAoII6FSeYOKA+gZcXfomVBccAoRgrDGED4iY+DQWPSvQYizTu3FJ5OzWe68Cn5vMmmEztQAXunhkWz9NyXt7XEzQmP8BAAD//yKeO50AAAAGSURBVAMAhuhzZeBrvHMAAAAASUVORK5CYII="
        }
      />
    </div>
  );
}
