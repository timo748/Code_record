# -*- coding: utf-8 -*-
import scrapy
from chunyus.items import ChunyusItem

import re
import time


class ChunyuSpider(scrapy.Spider):
    name = 'chunyu'
    allowed_domains = ['chunyuyisheng.com']
    url = 'https://m.chunyuyisheng.com/m/hospitals/530000-0/?page='
    offset = 1
    start_urls = [url + str(offset)]

    def parse(self, response):
        links = response.xpath("/html/body/main/section[1]/a/@href").extract()
        print(links)
        province = response.xpath(
            "/html/body/main/section[1]/a/p/text()").extract()
        linklist = []
        for linkth in links:
            linklist.append("https://m.chunyuyisheng.com/"+linkth)
        print(linklist[0])
        index = 0
        for link in linklist:
            time.sleep(1)
            yield scrapy.Request(link, callback=self.parse_item, meta={'url': links, 'province': province, 'index': index})
            index = index+1

        if self.offset <= 25:
            self.offset += 1
            yield scrapy.Request(self.url + str(self.offset), callback=self.parse)

    def parse_item(self, response):
        # items = []
        item = ChunyusItem()
        indexs = response.meta['index']
        hospital = response.xpath("/html/body/main/header/h1/text()").extract()
        province = response.meta['province']
        city = response.meta['province']
        rank = response.xpath("/html/body/main/header/p/text()").extract()
        introduce = response.xpath(
            "/html/body/main/section/p[1]/text()").extract()
        address = response.xpath(
            "/html/body/main/section/p[2]/text()").extract()
        route = response.xpath("/text()").extract()
        urlLink = response.meta['url']
        print(urlLink)
        # urlLink = response.xpath("@href").extract()
        tel = response.xpath("/html/body/main/section/p[3]/text()").extract()

        item['hospital'] = hospital[0]
        item['province'] = province[indexs].split("省")[0]+"省"
        item['city'] = city[indexs].split("市")[0].split("省")[1]+"市"
        item['rank'] = rank[0]
        item['introduce'] = introduce[0]
        item['address'] = address[0]
        item['route'] = route
        item['urlLink'] = "https://m.chunyuyisheng.com/"+urlLink[indexs]
        item['tel'] = tel[0]

        # items.append(item)
        # return items
        # print(items)
        yield item
