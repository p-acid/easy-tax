import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Path {
  key: string
  value: string
}

interface DynamicRouteParams {
  path?: (string | Path)[]
  query?: Record<string, unknown>
}

export function getDynamicRoute(
  baseRoute: string,
  params?: DynamicRouteParams
) {
  if (!params) return baseRoute

  const { path, query } = params

  const pathString = path
    ? path.reduce((acc, cur) => {
        const isPathStatic = typeof cur === "string"
        return (
          acc + (isPathStatic ? `/${cur}` : `/${cur.value ?? `[${cur.key}]`}`)
        )
      }, "")
    : ""

  const queryString = query
    ? `?${Object.entries(query)
        .map(([key, value]) => (value ? `${key}=${value}` : ""))
        .join("&")}`
    : ""

  const result = baseRoute + pathString + queryString

  return result
}
