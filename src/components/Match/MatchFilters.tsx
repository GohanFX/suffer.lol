"use client"
import React, { ChangeEvent } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'

interface MatchFiltersProps {
  filter: string,
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const MatchFilters = ({filter, setFilter}: MatchFiltersProps) => {

  return (
    <>
    <Select>
            <SelectTrigger className="text-white bg-transparent border-zinc-800 min-w-[150px] h-[30px]">
              <SelectValue
                className="text-white text-[8px]"
                placeholder="Filter by Queue"
              />
            </SelectTrigger>
            <SelectContent className="bg-panels text-white border-zinc-800 ">
              <SelectGroup className="text-white text-opacity-70">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="ranked">Ranked</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search"
            onChange={(e) => {
              setFilter(e.target.value)
            }}
            className="min-w-[200px] h-[30px] bg-transparent text-white focus:outline-none placeholder:text-white/40 outline-none border-zinc-800"
          />
    </>
  )
}

export default MatchFilters